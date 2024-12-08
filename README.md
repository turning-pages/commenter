# Just Opinion (Comments)

Just Opinion (Comments) is a project to provide a very simple bare-bone commenting system. This can be integrated anywhere at any website - static or dynamic.

## Features
### v1.0.0
- Basic commenting system with comment box, commenter's name (optional) and submit button
- Shows a list of the comment on a specific page based on pathname of the page.
- List contains an auto-generated avatar with commenter's initial and input date time.
- Comments are saved in a `sqlite3` database, so it is portable.

## Installation

1. Clone the repository:
    ```bash
    git clone git@github.com:turning-pages/just-opinion.git
    ```
2. Navigate to the project directory:
    ```bash
    cd just-opinion
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Running

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the development server in `dev` mode:
    ```bash
    npm run dev
    ```
3. Start the development server in `production` mode:
    ```bash
    npm start
    ```
4. Open your browser and navigate to `http://localhost:3000`

## Deploying
- It is open to deploy anywhere `nodejs` express application runs. 
- No special permission or feature needed

## Usage
### In an iframe
- After deploying to `https://<your-domain>.<your-tld>`, you can use `https://<your-domain>.<your-tld>`  as your iframe source.

### Embedding to a site
- After deploying to `https://<your-domain>.<your-tld>`, you can use the following code anywhere you want the comment box to show up
```bash
<script src="https://<your-domain>.<your-tld>/env.js"></script>
<script src="https://<your-domain>.<your-tld>/comments.js"></script>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
