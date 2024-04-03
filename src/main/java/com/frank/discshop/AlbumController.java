package com.frank.discshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/discshop/albums")
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable Long id) {
        Optional<Album> album = albumRepository.findById(id);
        if (album.isPresent()) {
            return ResponseEntity.ok(album.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album newAlbum) {
        return albumRepository.save(newAlbum);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable Long id, @RequestBody Album albumDetails) {
        return albumRepository.findById(id)
                .map(album -> {
                    album.setTitle(albumDetails.getTitle());
                    album.setArtist(albumDetails.getArtist());
                    album.setReleaseYear(albumDetails.getReleaseYear());
                    album.setCoverImageName(albumDetails.getCoverImageName());
                    album.setCopyright(albumDetails.getCopyright());
                    Album updatedAlbum = albumRepository.save(album);
                    return ResponseEntity.ok(updatedAlbum);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long id) {
        return albumRepository.findById(id)
                .map(album -> {
                    albumRepository.delete(album);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Album>> searchAlbums(@RequestParam(name = "title") String searchTerm) {
        List<Album> albums = albumRepository.searchByTitleIgnoringCaseAndSpace(searchTerm);
        if (albums.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(albums);
    }

}
