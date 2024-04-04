// scripts.js
$(document).ready(function() {
    loadAlbums();

    $('#search-btn').on('click', function() {
        var searchTerm = $('#search-box').val();
        if (searchTerm) {
            searchAlbums(searchTerm);
        } else {
            $('#album-container').removeClass('search-results');
            loadAlbums();
        }
    });
});

function loadAlbums() {
    $.ajax({
        url: '/discshop/albums',
        type: 'GET',
        success: function(albums) {
            var container = $('#album-container');
            container.empty();

            $.each(albums, function(index, album) {
                container.append(
                    '<div class="album-card">' +
                    '<img src="images/' + album.coverImageName + '" alt="' + album.title + '">' +
                    '<div class="album-info">' +
                    '<h3>' + album.title + '</h3>' +
                    '<p>' + album.artist + '</p>' +
                    '<p>' + album.releaseYear + '</p>' +
                    '</div>' +
                    '</div>'
                );
            });
        },
        error: function() {
            container.html('<p>Unable to load albums. Please try again later.</p>');
        }
    });
}

function searchAlbums(searchTerm) {
    $.ajax({
        url: '/discshop/albums/search',
        type: 'GET',
        data: { title: searchTerm },
        success: function(albums) {

            var container = $('#album-container');
            container.empty();
            container.addClass('search-results');


            if (albums.length === 0) {
                container.append('<p class="not-found">No albums found.</p>'); // 如果没有搜索结果，显示提示
            } else {

                $.each(albums, function(index, album) {
                    container.append(
                        '<div class="album-card">' +
                        '<img src="images/' + album.coverImageName + '" alt="' + album.title + '">' +
                        '<div class="album-info">' +
                        '<h3>' + album.title + '</h3>' +
                        '<p>' + album.artist + '</p>' +
                        '<p>' + album.releaseYear + '</p>' +
                        '</div>' +
                        '</div>'
                    );
                });
            }
        },
        error: function() {
            $('#album-container').html('<p class="not-found">No albums found. Please try again later.</p>');
        }
    });
}
