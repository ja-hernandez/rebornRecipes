using System;
using System.ComponentModel.DataAnnotations;

namespace rebornRecipes.Models
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Measurement { get; set; }

        public string Note { get; set; }


        public Ingredient()
        {
        }
    }
}
