# ReadMe Builder

## Synopsis

Asks the user a series of questions and uses that information to automatically build a starter README.md.

## Details

The program starts off by asking the user for their GitHub username. From there, it asks which of their repos they'd like to generate a readme for. From there, is asks a series of questions about the repo. It then uses that information to create the readme in Markdown format, saving it under *project-root*/results/*repo-name*/README.md

[Watch it in action.]("https://drive.google.com/file/d/1AZsxF8Kr77fZVIjAfVOdY0j4LRwx6MUO/preview")

## Installation and Usage

Once you've cloned this repo, install the dependancies by entering:

```sh
npm install
```

To run the program, simply enter:

```sh
node index.js
```

From there, follow the prompts. When your readme is created, you'll be given the path from where you can copy it.