using Microsoft.EntityFrameworkCore;
using resource_api.Models;

namespace resource_api.Data
{
    public class ResourceDbContext : DbContext
    {
        public ResourceDbContext(DbContextOptions<ResourceDbContext> options) : base(options)
        {
        }

        public DbSet<Pack> Packs { get; set; }
        public DbSet<Puzzle> Puzzles { get; set; }
        public DbSet<PuzzleImage> PuzzleImages { get; set; }
    }
}