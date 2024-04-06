$(document).ready(function() {
    // DataTable
    $('#albumsTable').DataTable({
        "ajax": {
            "url": "http://localhost:8090/discshop/albums",
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
            $('.card').each(function(index) {
                if (index < albums.length) {
                    var album = albums[index];
                    $(this).find('.card-img-top').attr('src', 'images/' + album.coverImageName).attr('alt', album.title);
                    $(this).find('.card-text').text(album.title + ' - ' + album.artist + ' (' + album.releaseYear + ')');
                }
            });
        },
        error: function() {
            console.log("Error loading album data");
        }
    });


    $('#addAlbumBtn').click(function() {
        resetModal();
        $('#editAlbumForm').find('input').val('');

        $('#editAlbumModalLabel').text('Add New Album');

        $('#deleteAlbumBtn').hide();

        $('#editAlbumModal').modal('show');
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
                $('#albumsTable').DataTable().ajax.reload(null, false);
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
        var albumId = $('#albumId').val();
        var confirmDelete = confirm("Are you sure you want to delete this album?");
        if (confirmDelete) {

            $.ajax({
                url: 'http://localhost:8090/discshop/albums/' + albumId,
                type: 'DELETE',
                success: function(result) {
                    $('#editAlbumModal').modal('hide');
                    $('#albumsTable').DataTable().ajax.reload();
                    alert("Album deleted successfully.");
                },
                error: function() {
                    alert("Error deleting album.");
                }
            });
        }
    });
});

function editAlbum(albumId) {
    resetModal();
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
//reset the Modal
function resetModal() {
    $('#editAlbumForm').find('input').val('');
    $('#editAlbumModalLabel').text('Edit Album');
    $('#deleteAlbumBtn').show();
}



