﻿namespace Blog.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string URLHandle { get; set; }
        public ICollection<BlogPost> BlogPosts { get; set; }
    }
}
