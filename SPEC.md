# Technical Specification: Healthcare Patient Risk Scoring Tool

A web application that connects to a healthcare data API, fetches patient records, calculates a risk score for each patient, and generates a categorised alert list.

The application needs to:

- Fetch a paginated list of patients from the API endpoint `GET /api/patients`
- Calculate a total risk score for each patient based on three categories: blood pressure, temperature, and age
- Identify patients who fall into specific alert categories:
  - high risk (total score of 4 or more)
  - fever (temperature above 99 degrees Fahrenheit)
  - data quality issues (missing age, blood pressure, or temperature values)
- Submit the final alert list to `POST /api/submit-assessment` with the three arrays of patient identifiers

## Why

This is a technical assessment for Ksense. The goal is to demonstrate the ability to work with a real-world style API that deliberately introduces challenges such as rate limiting, intermittent server errors, response inconsistencies, and missing data fields. The solution needs to handle these gracefully rather than assuming clean, reliable responses.

## Risk Scoring Rules

Each patient gets a total score that is the sum of three individual scores:

**Blood Pressure Score**

- Normal (systolic below 120, diastolic below 80): 0 points
- Elevated (systolic 120 to 129): 1 point
- Stage 1 hypertension (systolic 130 to 139, diastolic 80 to 89): 2 points
- Stage 2 hypertension (systolic 140 or above, diastolic 90 or above): 3 points
- Invalid or missing data: flag as a data quality issue, do not score

**Temperature Score**

- Normal (97.5 to 99.5 degrees Fahrenheit): 0 points
- Low fever (99.6 to 100.9 degrees): 1 point
- High fever (101 degrees or above): 3 points
- Invalid or missing data: flag as a data quality issue, do not score

**Age Score**

- Under 40 years: 0 points
- 40 to 60 years (inclusive): 1 point
- Over 60 years: 2 points
- Missing data: flag as a data quality issue, do not score

**Total Risk Score = Blood Pressure Score + Temperature Score + Age Score**

## Technologies

- Next.js with the App Router as the framework
- React for the user interface
- TypeScript for type safety across API responses and scoring logic
- Native Fetch for API calls (no external HTTP libraries needed)

## Application Structure

The application has two main concerns: data fetching with error handling, and the scoring and submission logic.

**Data Fetching**

The API has a 5 patient per page default and a maximum of 30 per page. Fetching all patients requires looping through pages until the full list is retrieved. The API returns 429 errors when requests come in too fast, so the fetching logic needs a retry mechanism with a short delay between attempts. It also has a roughly 4 in 10 chance of returning a 500 error on any given request, so retries on server errors are also required.

**Scoring and Submission**

Once all patients are fetched, each one is scored. The application then builds three arrays of patient identifiers and posts them to the submission endpoint. The response includes a score out of 100 and a breakdown, which should be displayed to the user.

**Interface**

A single page that shows the current status while data is being fetched, displays any errors clearly, shows the patient list with their scores after fetching is complete, and shows the final submission result including the score returned by the assessment API.

## Authentication

All requests to the API require the header `x-api-key` with the session key provided on the assessment page. The key should be stored in an environment variable and passed through a Next.js server action or route handler to avoid exposing it on the client side.

## Handling API Inconsistencies

The API documentation notes that responses occasionally return data in different formats or with missing fields. The scoring logic should treat any value that cannot be parsed as a number as missing data, and flag the patient as a data quality issue rather than crashing or silently scoring them incorrectly.
