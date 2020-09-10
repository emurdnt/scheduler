# Interview Scheduler

This is a scheduler where the user can book an appointment. There are 5 appointment slots for each day (Monday-Friday). An appointment can be edited or cancelled if the user wants to. This project is built on **React** and **PostGres SQL**. 

The app is currently deployed on **Netlify** with the backend in **Heroku**. I have also used **CircleCI** to run the tests before the project is deployed to production.

Visit the app [here](https://5f597d21f9c9a40007de331c--blissful-lovelace-3f565a.netlify.app).

The .env file is using Heroku for the deployed project. Use these configurations to connect to the local server:
```PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```
---
## Screenshots
The appointments section on the app is made up of various components that render depending on the state.

![Empty view of the scheduler. The days are on the left side while the right is occupied by the appointments.](https://raw.githubusercontent.com/emurdnt/scheduler/master/docs/scheduler-empty.png)



![Clicking the plus on the screen will show a form that the use will fill-up for an appointment.](https://raw.githubusercontent.com/emurdnt/scheduler/master/docs/scheduler-add.png)

![An edit and delete button will show when a user hovers over a booked appointment. A confirmation message appears before an appointment is deleted.](https://raw.githubusercontent.com/emurdnt/scheduler/master/docs/scheduler-delete.png)

![A day cannot be selected when all the appointment spots have been booked.](https://raw.githubusercontent.com/emurdnt/scheduler/master/docs/scheduler-full.png)
