using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyTeamTracker.Models;
namespace MyTeamTracker.Controllers.TeamSearch.TeamDetails
{
    public class TeamDetailsController : ApiController
    {
        public class VmPlayer
        {
            public VmPlayer()
            { }
        
            public VmPlayer(Player player)
            {
                LastName = player.LastName;
                FirstName = player.FirstName;
                Id = player.Id;
            }
            public int Id;
            public string FirstName;
            public string LastName;
        };
        public class VmTeam
        {
            public VmTeam()
            { }
            public VmTeam(Team team)
            {
                Name = team.Name;
                 Id = team.Id;
            }
            public int Id;
            public string Name;
            
        };
        public List<VmPlayer> GetTeamMembers(int teamId)
        {
            var teamMembers = new List<VmPlayer>();
            var db = new MyTeamTrackerContext();
            var team = db.Teams.Single(x => x.Id == teamId);
            teamMembers = team.Players.ToList().Select(x =>   new VmPlayer(x)).ToList();
            return teamMembers;
        }
        [System.Web.Http.HttpPost]
        public VmTeam PostTeamChanges(VmTeam teamToSave)
        {
            var db = new MyTeamTrackerContext();
            Team team;
            if (teamToSave.Id == 0)
            {
                team = db.Teams.SingleOrDefault(x => x.Name == teamToSave.Name);
                if (team == null)
                {
                    team = new Team { Name = teamToSave.Name };
                    db.Teams.Add(team);
                }
                else
                {

                }
            }
            else
            {
                team = db.Teams.Single(x => x.Id == teamToSave.Id);
                team.Name = teamToSave.Name;             
            }
            db.SaveChanges();
            return new VmTeam(team);
        }
        public List<VmTeam> GetTeams()
        {
            var db = new MyTeamTrackerContext();
            var teams = db.Teams.ToList().Select(x => new VmTeam(x)).ToList();
            return teams;
        }
        public List<VmPlayer> GetPlayers()
        {
             var db = new MyTeamTrackerContext();
            var players = db.Players.ToList().Select(x => new VmPlayer(x)).ToList();
            return players;
        }
        public void DeletePlayer(int playerId)
        {
            var db = new MyTeamTrackerContext();
            var playerToRemove = db.Players.Single(x => x.Id == playerId);
            db.Players.Remove(playerToRemove);
            db.SaveChanges();
        }
        public void DeleteTeam(int teamId)
        {
            var db = new MyTeamTrackerContext();
            var teamToRemove = db.Teams.Single(x => x.Id == teamId);
            db.Teams.Remove(teamToRemove);
            db.SaveChanges();
        }
        public void PostRemovePlayerFromTeam(int playerId, int teamId)
        {
            var db = new MyTeamTrackerContext();
            var playerToRemove=db.Players.Single(x=>x.Id==playerId);
            var team=db.Teams.Single(x=>x.Id==teamId);
            team.Players.Remove(playerToRemove);
            db.SaveChanges();
        }
        [HttpGet]
        public void AddPlayerToTeam(int playerId, int teamId)
        {
            var db = new MyTeamTrackerContext();
            var playerToAdd = db.Players.Single(x => x.Id == playerId);
            var team = db.Teams.Single(x => x.Id == teamId);
            team.Players.Add(playerToAdd);
            db.SaveChanges();
        }

        public VmPlayer PostPlayerChanges(VmPlayer memberToSave)
        {
            var db = new MyTeamTrackerContext();
            Player player;
            if (memberToSave.Id == 0)
            {
                player = db.Players.SingleOrDefault(x => x.FirstName == memberToSave.FirstName && x.LastName == memberToSave.LastName);
                if (player == null)
                {
                    player = new Player { LastName = memberToSave.LastName, FirstName = memberToSave.FirstName };
                    db.Players.Add(player);
                }
                else
                {
                   
                }
            }
            else
            {
                player = db.Players.Single(x => x.Id == memberToSave.Id);
                player.FirstName = memberToSave.FirstName;
                player.LastName = memberToSave.LastName;
            }
            db.SaveChanges();
            return new VmPlayer(player);
        }
    }
}
