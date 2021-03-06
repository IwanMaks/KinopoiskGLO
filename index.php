<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <title>Kinopoisk</title>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <a href="" class="navbar-brand">Kinopoisk</a>
        </div>
        <!-- /.container -->
    </nav>
    <!-- /.navbar -->
    <div class="container">
        <div class="jumbotron">
            <h3 class="text-center">Поиск фильмов</h3>
            <form id="search-form">
                <input type="text" class="form-control" id="searchText" placeholder="Введите название...">
            </form>
            <!-- /.search-form -->
        </div>
        <!-- /.jumbotron -->
    </div>
    <!-- /.container -->
    
    <div class="container">
        <div id="movies" class="row">

        </div>
    </div>
    <!-- /.container -->
    <script src="js/index.js"></script>
</body>
</html>