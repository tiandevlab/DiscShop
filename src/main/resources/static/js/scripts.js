// scripts.js
$(document).ready(function() {
    loadAlbums();

    // 监听搜索按钮的点击事件
    $('#search-btn').on('click', function() {
        var searchTerm = $('#search-box').val(); // 获取搜索框中的值
        if (searchTerm) {
            searchAlbums(searchTerm); // 执行搜索
        } else {
            loadAlbums(); // 如果搜索框为空，重新加载所有专辑
        }
    });
});

// 现有的 loadAlbums 函数...
function loadAlbums() {
    $.ajax({
        url: '/discshop/albums', // 您的后端API端点
        type: 'GET',
        success: function(albums) {
            var container = $('#album-container');
            // 清除现有内容
            container.empty();

            // 遍历返回的相册数据数组
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
        url: '/discshop/albums/search', // 搜索API的端点
        type: 'GET',
        data: { title: searchTerm },
        success: function(albums) {
            // 如果成功，显示搜索到的专辑
            var container = $('#album-container');
            container.empty(); // 清除现有内容

            // 检查返回的数组是否为空
            if (albums.length === 0) {
                container.append('<p class="not-found">No albums found.</p>');
            } else {
                // 如果有搜索结果，使用返回的数据动态创建专辑卡片
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
            // 如果请求失败，显示错误信息
            $('#album-container').html('<p>Unable to load albums. Please try again later.</p>');
        }
    });
}
