/**
 * Created by sree on 11/18/16.
 */

var kindergartenWordSortApp = angular.module('kindergartenWordSortApp', []);

kindergartenWordSortApp.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element[0].addEventListener('dragstart', scope.handleDragStart, false);
            element[0].addEventListener('dragend', scope.handleDragEnd, false);
        }
    }
});

kindergartenWordSortApp.directive('droppable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element[0].addEventListener('drop', scope.handleDrop, false);
            element[0].addEventListener('dragover', scope.handleDragOver, false);
        }
    }
});


kindergartenWordSortApp.controller('kindergartenWordSortController', function ($scope, $http) {
    $scope.gameTitleFormSubmit = function () {
        $scope.loadCreateCategoriesScreen = true;
    };

    $scope.gameCategoriesFormSubmit = function () {
        var gameCategories = [];
        var gameCategoriesTitles = $scope.gameCategoriesBlob.split(",").slice(0, 4);
        _.forEach(gameCategoriesTitles, function (gameCategoriesTitle) {
            gameCategories.push({
                title: gameCategoriesTitle.trim(),
                words: undefined
            });
        });
        $scope.gameCategories = gameCategories;
        $scope.loadCreateWordsScreen = true;
    };

    $scope.gameWordsBlobSubmit = function () {
        _.forEach($scope.gameCategories, function (gameCategory) {
            var texts = gameCategory.wordBlob.split(",");
            gameCategory.words = [];
            _.forEach(texts, function (text) {
                gameCategory.words.push({
                    text: text.trim(),
                    used: false
                });
            })
        });
        $scope.shuffledGameCategories = $scope.gameCategories;
        setRandomWord();
        $scope.loadGameScreen = true;

    };

    function setRandomWord() {
        var randomIndex = getRandomInt($scope.shuffledGameCategories.length);
        var randomGameCategory = $scope.shuffledGameCategories[randomIndex];
        for (var w in randomGameCategory.words) {
            var word = randomGameCategory.words[w];
            if (word.used == false) {
                word.categoryTitle = randomGameCategory.title;
                word.used = true;
                if ($scope.currentGameWord === undefined) {
                    $scope.currentGameWord = word;
                }
                else {
                    $scope.currentGameWord = word;
                    $scope.$apply();
                }
                return true;
            }
        }
        $scope.shuffledGameCategories = $scope.shuffledGameCategories.splice(randomIndex, 1);
        setRandomWord();
    }

    $scope.handleDragStart = function (e) {
        this.style.opacity = '0.4';
        this.className = "btn btn-warning";

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData('text/plain', this.innerHTML);
    };

    $scope.handleDragEnd = function (e) {
        this.style.opacity = '1.0';
        this.className = "btn btn-info"
    };

    $scope.handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var gameCategoryTitle = this.getAttribute("data-gameCategoryTitle");
        // var currentGameWordText = e.dataTransfer.getData('text/plain');
        if (isWordInCategory($scope.currentGameWord, getGameCategory(gameCategoryTitle)))
        {
            console.log("CORRECT");
            // e.target.appendChild("<button class='btn btn-success'>" + $scope.currentGameWord.text + "</button>");
            appendCurrentGameWordInTargetContainer(e.target);
            setRandomWord();
        }
        else {
            console.log("TRY AGAIN");
        }
    };

    $scope.handleDragOver = function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
    };

    function isWordInCategory(currentGameWord, gameCategory){
        return _.find(gameCategory.words, {text: currentGameWord.text});
    }

    function getGameCategory(gameCategoryTitle){
        return _.find($scope.gameCategories, {title:gameCategoryTitle});
    }

    function appendCurrentGameWordInTargetContainer(target){
        var childElement = document.createElement('button');
        childElement.className = "btn btn-success";
        childElement.innerHTML = $scope.currentGameWord.text;
        target.appendChild(childElement);
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * (max));
}