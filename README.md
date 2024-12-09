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

## Configuration
1. If you want to use a remote database sqlite3 `.db` file, put the url on the `src/config.yaml` file `dbFileLocation` field.
2. While deploying the application somewhere, you will have the webservice url or the api endpoint. Update the `apiUrl` field in the `src/config.yaml` file with that value (e.g.: `https://<your-domain>.<your-tld>`) replacing the existing value.

## Running

1. Build the project:
   ```bash
   npm run build
   ```
2. Development:
   1. Start the server in `dev` mode:
        ```bash
        npm run dev
        ```
        This will start the application by default at port `3000`
    2. Open your browser and navigate to `http://localhost:3000`

3. Production
   1. Start the server in `production` mode:
    ```bash
    npm start
    ```
   2. The url will be `https://<your-domain>.<your-tld>` i.e. where you are deploying the application.



## Deploying
- It is open to deploy anywhere `nodejs` express application runs. 
- No special permission or feature needed

## Usage
### In an iframe
- After deploying to `https://<your-domain>.<your-tld>`, you can use `https://<your-domain>.<your-tld>`  as your iframe source.

### Embedding to a site
- After deploying to `https://<your-domain>.<your-tld>`, you can use the following code anywhere you want the comment box to show up
```bash
<link rel="stylesheet" href="https://<your-domain>.<your-tld>/comments.css">
<script src="https://<your-domain>.<your-tld>/env.js"></script>
<script src="https://<your-domain>.<your-tld>/comments.js"></script>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
