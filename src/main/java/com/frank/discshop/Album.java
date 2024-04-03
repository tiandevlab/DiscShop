package com.frank.discshop;

import jakarta.persistence.*;

@Entity // 表明这是一个Jakarta Persistence实体
@Table(name = "Albums") // 指定对应的表名是"Albums"
public class Album {

    @Id // 表明这个属性是表的主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 主键值自动生成
    private Long id;

    @Column(nullable = false) // 对应数据库的 title 列
    private String title;

    @Column(nullable = false) // 对应数据库的 artist 列
    private String artist;

    @Column(name = "release_year") // 显式指明对应的列名为 release_year
    private Integer releaseYear;

    @Column(name = "cover_image_name") // 显式指明对应的列名为 cover_image_name
    private String coverImageName;

    @Column // 对应数据库的 copyright 列
    private String copyright;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getCoverImageName() {
        return coverImageName;
    }

    public void setCoverImageName(String coverImageName) {
        this.coverImageName = coverImageName;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    // 构造函数
    public Album() {
    }

    public Album(String title, String artist, Integer releaseYear, String coverImageName, String copyright) {
        this.title = title;
        this.artist = artist;
        this.releaseYear = releaseYear;
        this.coverImageName = coverImageName;
        this.copyright = copyright;
    }
}
