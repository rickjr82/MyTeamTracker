using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using MyTeamTracker.Models.Mapping;

namespace MyTeamTracker.Models
{
    public partial class MyTeamTrackerContext : DbContext
    {
        static MyTeamTrackerContext()
        {
            Database.SetInitializer<MyTeamTrackerContext>(null);
        }

        public MyTeamTrackerContext()
            : base("Name=MyTeamTrackerContext")
        {
        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new PlayerMap());
            modelBuilder.Configurations.Add(new TeamMap());
        }
    }
}
