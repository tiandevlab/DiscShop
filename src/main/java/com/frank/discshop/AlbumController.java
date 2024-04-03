package com.frank.discshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/discshop/albums") // 控制器基础路径
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    // 获取所有专辑
    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    // 根据ID获取单个专辑
    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable Long id) {
        Optional<Album> album = albumRepository.findById(id);
        if(album.isPresent()) {
            return ResponseEntity.ok(album.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 创建新专辑
    @PostMapping
    public Album createAlbum(@RequestBody Album newAlbum) {
        return albumRepository.save(newAlbum);
    }

    // 根据ID更新专辑
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

    // 根据ID删除专辑
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long id) {
        return albumRepository.findById(id)
                .map(album -> {
                    albumRepository.delete(album);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
