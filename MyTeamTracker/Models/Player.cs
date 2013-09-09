using System;
using System.Collections.Generic;

namespace MyTeamTracker.Models
{
    public partial class Player
    {
        public Player()
        {
            this.Teams = new List<Team>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
    }
}
