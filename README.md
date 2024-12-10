<img src="public/icon.png" />

# Postrocket

A simple web-based clone of Postman

## Local Usage
### Installation
```shell
git clone git@github.com:Fabian-Kleine/postrocket.git

cd postman-clone
```

### Run local development server
```bash
npm run dev
```


## Usage in NixOS
### Installation
Clone the git Repo into NixOS
```shell
mkdir postrocket

cd postrocket

git clone git@github.com:Fabian-Kleine/postrocket.git

cd postman-clone
```

### Initialize direnv
```shell
direnv allow
```

Now when you go into the project directory using `cd` the development server will automatically start:
```
VITE v5.4.6  ready in 172 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```
