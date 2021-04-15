using System;
using System.ComponentModel.DataAnnotations;

namespace rebornRecipes.Models
{
    public class IsForked
    {
        [Required]
        public bool Forked { get; set; }
        public int? ParentId { get; set; }
        public IsForked()
        {
            Forked = false;
        }
    }
}
