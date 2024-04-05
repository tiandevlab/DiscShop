$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8090/discshop/albums', // 替换成你的API端点
        type: 'GET',
        success: function(albums) {
            // 确保专辑的数量和卡片的数量相匹配
            $('.card').each(function(index) {
                if (index < albums.length) {
                    var album = albums[index];
                    $(this).find('.card-img-top').attr('src', 'images/' + album.coverImageName).attr('alt', album.title);
                    $(this).find('.card-text').text(album.title + ' - ' + album.artist + ' (' + album.releaseYear + ')');
                    // 如果有其他信息，也可以在这里更新
                }
            });
        },
        error: function() {
            console.log("Error loading album data");
        }
    });
});
