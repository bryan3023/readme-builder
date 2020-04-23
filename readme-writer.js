"use strict;"

const fs = require("fs");


function write(repoInfo) {
  const readme = [
    writeTitle(repoInfo.name),
    writeSection("Description", repoInfo.description),
    writeTableOfContents([
      'Installation',
      'Usage',
      'License',
      'Contributing',
      'Tests',
      'Questions'
    ]),
    writeCodeSection(
      "Installation",
      "To install dependencies, run the following:",
      repoInfo.install
    ),
    writeSection("Usage", repoInfo.usage),
    writeSection("License", repoInfo.license),
    writeSection("Contributing", repoInfo.contributions),
    writeCodeSection(
      "Testing",
      "To run tests on the program, run the follwoing:",
      repoInfo.test
    ),
    writeSection(
      "Questions",
      writeUserInfo(
        repoInfo.ownerName,
        repoInfo.profileUrl,
        repoInfo.avatarUrl,
        repoInfo.email
      )
    )
  ].join('\n');

  saveReadme(repoInfo.name, readme)
  console.log(readme)
}

function writeTitle(repoName) {
  return [
    `# ${repoName}`,
    ''
  ].join('\n');
}

function writeSection(header, body) {
  return [
    writeHeader(header),
    body,
    ''
  ].join('\n');
}

function writeHeader(header) {
  return [
    `## ${header}`,
    ''
  ].join('\n');
}

function writeTableOfContents(sections) {
  const toc = sections.map(section => `* [${section}](#${section})`).join('\n');
  return writeSection("Table of Contents", toc);
}

function writeCodeSection(header, decription, command) {
  return writeSection(header, writeCodeBody(decription,command));
}

function writeCodeBody(description, command) {
  return [
    description,
    '',
    '```sh',
    command,
    '```'
  ].join('\n');
}

function writeUserInfo(ownerName, profileUrl, avatarUrl, email) {
  const result = [
    'For questions, please contact:',
    '',
    `<img src="${avatarUrl}" alt="${ownerName}'s profile picture" style="height: 100px; width: 100px" />`,
    '',
    `[@${ownerName}](${profileUrl})`
  ];
  if (email) {
    result.push(`[${email}](mailtto:${email})`)
  }
  return result.join('\n');
}

function saveReadme(repo, readme) {
  const
    path = `results/${repo}`,
    outFile = `${__dirname}/${path}/README.md`;

  createFolder("results")
  createFolder(path);
  fs.writeFile(outFile, readme, "utf8", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log(`File saved in: ${outFile}`);
  })
}

function createFolder(directory) {
  const path = `${__dirname}/${directory}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

module.exports = {
  write
};