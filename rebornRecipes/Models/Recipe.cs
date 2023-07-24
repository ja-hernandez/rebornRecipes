using System;
using System.ComponentModel.DataAnnotations;


namespace rebornRecipes.Models
{
    public class Recipe
    {
        [Key]
            public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public double Rating { get; set; }

        public int NumOfRatings { get; set; }

        public Uri Image { get; set; }

        [Required]
        public string Instructions { get; set; }

        public string CreatedBy { get; set; }

        [Required]
        public bool IsForked { get; set; } = false;

        public int ParentId { get; set; }


        [Required]
        public string Ingredients { get; set; }


        public Recipe()
        {
        }
    }
}
