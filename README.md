# FIFA World Cup Football Fan Route: Which team is the best to support if you want to experience as much of the World Cup as possible?

# This is a small fun project to combine football and operations research.
This is a small fun project for football fans.
Choose your favourite team and find a road trip to watch all of its matches. The route is built using road distances and travel times between stadiums.
The project also tries to find extra matches that a fan can watch without missing their team's matches. 

## Features
- Choose a team.
- Choose whether the team finishes 1st or 2nd in the group.
- Show the driving route on an interactive map.
- Show total driving distance and travel time.
- Find bonus matches that can be watched between your team's matches.

## Input data
- Collected FIFA world cup 2026 schedule from https://www.thestatsapi.com/ and https://www.fifa.com/
- After processing, the input schema is like {Match_id, kickoff_time_utc, teamA, teamB, host_city, latitude, longitude, stage}

## How it works
The project uses:
- Python for data processing and optimization.
- OSRM for road routes and travel times.
- Leaflet and OpenStreetMap for the interactive map.
- HTML, CSS and JavaScript for the web interface.

The optimization has two objectives:
1. Watch the maximum number of bonus matches.
2. If there are multiple solutions, choose the one with the shortest driving distance.

How does bonus match calculation work?
1. Say, match1 is at locationA on 12th June at 21:00 UTC and my team's second match (match2) is at locationB on 19th June 10:00 UTC
2. I try to find all matches between 12th June 21:00 + match_duration to 19th June 10:00
3. Then maximize the count of matches considering each match duration and travel time

## Notes
This project is made for fun and demonstration.
The code is intentionally simple.
If you have ideas to improve the optimization or add new features, feel free to fork the repository or open an issue. There are some limitations listed in the limatation_v{number}.txt file.
