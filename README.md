Building a flight-tracking dashboard that automatically pulls live status updates from AeroDataBox, eliminating the need to manually check flights. Stores flight data in Supabase, uses React for the front end, and leverages Supabase Edge Functions to keep information current. Update and delete functionalities in progress.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Upcoming
- Add "editing" state to show options to select > delete or edit flights
    - Edit/Done Toggle w. useState (isEditing, setIsEditing)
    - Add confirmation prompt for update/delete

- User permissions, login, authorization
    - Look into options in Supabase

