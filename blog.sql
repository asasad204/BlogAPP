BEGIN TRANSACTION;

-- ako postoje obrisi ih
DROP TABLE IF EXISTS dbo.BlogPosts;
DROP TABLE IF EXISTS dbo.Categories;

-- ponovno kreiranje tabela
CREATE TABLE dbo.Category (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    UrlHandle NVARCHAR(255) NOT NULL
);

CREATE TABLE dbo.BlogPosts (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    ShortDescription NVARCHAR(MAX),
    Content NVARCHAR(MAX),
    FeatureImageURL NVARCHAR(255),
    URLHandle NVARCHAR(255),
    PublishedDate DATETIME NOT NULL,
    Author NVARCHAR(255),
    IsVisible BIT NOT NULL
);

-- vrati transakciju
ROLLBACK TRANSACTION;
