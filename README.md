# Interview Scheduler

## About

Hello dear viewer! This is is a full-stack application made with React and Node. It allows students to schedule interviews with interviewers, cancel their interviews, or edit their existing interviews. This app works as the client, while the [scheduler-api](https://github.com/vsp412/scheduler-api) acts as the server, it contains seed data which creates a PostgreSQL database and populates it with random data forming 3 tables.
Follow the instructions in the [scheduler-api README.md file](https://github.com/vsp412/scheduler-api/blob/master/README.md) in order to setup the server for running this app.

## How it looks

!["Main UI of the app"](https://github.com/vsp412/scheduler/blob/master/docs/general_ui.png)

!["Creating an appointment"](https://github.com/vsp412/scheduler/blob/master/docs/create.png)

!["Saving an appointment"](https://github.com/vsp412/scheduler/blob/master/docs/status_saving.png)

!["No spots left for the day"](https://github.com/vsp412/scheduler/blob/master/docs/no_spots_left.png)

!["Editing an appointment"](https://github.com/vsp412/scheduler/blob/master/docs/edit.png)

!["Confirm delete?"](https://github.com/vsp412/scheduler/blob/master/docs/confirm.png)

!["Deleting an appointment"](https://github.com/vsp412/scheduler/blob/master/docs/status_removing.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
