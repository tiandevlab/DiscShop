$(document).ready(function() {
    // DataTable
    $('#albumsTable').DataTable({
        "ajax": {
            "url": "http://localhost:8090/discshop/albums", // 替换成你的API端点
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "title" },
            { "data": "artist" },
            { "data": "releaseYear" },
            {
                "data": "coverImageName",
                "render": function(data, type, row, meta) {
                    return '<img src="images/' + data + '" alt="Cover Image" class="img-thumbnail" style="width: 60px; height: 60px;">';
                }
            },
            { "data": "copyright" },
            {
                "data": "id",
                "render": function(data, type, row, meta) {
                    return '<button class="btn btn-primary btn-sm" onclick="editAlbum(' + data + ')">Edit</button>';
                }
            }
        ]
    });


    // albums
    $.ajax({
        url: 'http://localhost:8090/discshop/albums',
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

    // edit
    $('#editAlbumModal .btn-primary').click(function() {
        var albumId = $('#albumId').val();
        var albumData = {
            title: $('#albumTitle').val(),
            artist: $('#albumArtist').val(),
            releaseYear: $('#albumReleaseYear').val(),
            coverImageName: $('#albumCoverImageName').val(),
            copyright: $('#albumCopyright').val()
        };

        var requestType, requestUrl;

        // 检查是添加还是更新
        if (albumId) {
            requestType = 'PUT';
            requestUrl = 'http://localhost:8090/discshop/albums/' + albumId;
        } else {
            requestType = 'POST';
            requestUrl = 'http://localhost:8090/discshop/albums';
        }

        $.ajax({
            url: requestUrl,
            type: requestType,
            contentType: 'application/json',
            data: JSON.stringify(albumData),
            success: function(result) {
                $('#editAlbumModal').modal('hide');
                $('#albumsTable').DataTable().ajax.reload(null, false); // 重新加载数据表，不重置分页
                if (albumId) {
                    alert("Album updated successfully.");
                } else {
                    alert("Album added successfully.");
                }
            },
            error: function() {
                if (albumId) {
                    alert("Error updating album.");
                } else {
                    alert("Error adding album.");
                }
            }
        });
    });


    //delete
    $('#deleteAlbumBtn').click(function() {
        var albumId = $('#albumId').val(); // 获取当前编辑的专辑ID
        var confirmDelete = confirm("Are you sure you want to delete this album?");
        if (confirmDelete) {
            // 如果用户确认删除，则执行删除操作
            $.ajax({
                url: 'http://localhost:8090/discshop/albums/' + albumId,
                type: 'DELETE',
                success: function(result) {
                    $('#editAlbumModal').modal('hide'); // 关闭Modal
                    $('#albumsTable').DataTable().ajax.reload(); // 重新加载数据表
                    alert("Album deleted successfully."); // 显示删除成功的提示
                },
                error: function() {
                    alert("Error deleting album."); // 如果有错误发生，显示错误提示
                }
            });
        }
    });



});

function editAlbum(albumId) {
    $.ajax({
        url: 'http://localhost:8090/discshop/albums/' + albumId,
        type: 'GET',
        success: function(album) {
            $('#albumId').val(album.id);
            $('#albumTitle').val(album.title);
            $('#albumArtist').val(album.artist);
            $('#albumReleaseYear').val(album.releaseYear);
            $('#albumCoverImageName').val(album.coverImageName);
            $('#albumCopyright').val(album.copyright);

            $('#editAlbumModal').modal('show');
        },
        error: function() {
            console.log("Error loading album details");
        }
    });
}

$('#addAlbumBtn').click(function() {
    $('#editAlbumForm').find('input').val('');

    $('#editAlbumModalLabel').text('Add New Album');

    $('#deleteAlbumBtn').hide();

    $('#editAlbumModal').modal('show');
});




