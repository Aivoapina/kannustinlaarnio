# Kannustinlaarnio

App that creates and tracks different incentives via generated incentive codes that are inserted to donation messages.  Used in FINNRUNS speedrun marathons.

## Getting Started

You need a PostgreSQL server and a database setuped. Then create tables listed in `db.sql`  
```
psql -U username -d database -a -f db.sql
```

Create a `.env` file from `.env-example` and fill in the values.

You can use poller to insert donations from a different API.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
