using System;
using System.Collections.Generic;
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

        public Uri Image { get; set; }

        [Required]
        public string[] Instructions { get; set; }

        public ApplicationUser CreatedBy { get; set; }

        [Required]
        public List<Ingredient> Ingredients { get; set; }


        public Recipe()
        {
        }
    }
}
