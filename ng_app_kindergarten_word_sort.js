/**
 * Created by sree on 11/18/16.
 */

var kindergartenWordSortApp = angular.module('kindergartenWordSortApp', []);

kindergartenWordSortApp.controller('kindergartenWordSortController', function ($scope, $http) {
    $scope.gameTitleFormSubmit = function () {
        $scope.loadCreateCategoriesScreen = true;
    };

    $scope.gameCategoriesFormSubmit = function () {
        var gameCategories = [];
        var gameCategoriesTitles = $scope.gameCategoriesBlob.split(" ").slice(0, 4);
        for (var g in gameCategoriesTitles) {
            gameCategories.push({title: gameCategoriesTitles[g]});
        }
        $scope.gameCategories = gameCategories;
        $scope.loadCreateWordsScreen = true;
    };

    $scope.gameWordsBlobSubmit = function () {
        $scope.gameWords = $scope.gameWordsBlob.split(" ");
        $scope.loadGameScreen = true;
    };

    $scope.allowDrop = function (ev) {
        ev.preventDefault();
    };

    $scope.drag = function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };

    $scope.drop = function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}