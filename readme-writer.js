/*
  Write the README file and save it under the results folder.
 */

"use strict;"

const fs = require("fs");


/*
  Build the README, then save it to the disk.
 */
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
      "To run tests on the program, run the following:",
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
}


/*
  Write the title of the README.
 */
function writeTitle(repoName) {
  return [
    `# ${repoName}`,
    ''
  ].join('\n');
}


/*
  Write a section of the README.
 */
function writeSection(header, body) {
  return [
    writeHeader(header),
    body,
    ''
  ].join('\n');
}


/*
  Write the header for a section.
 */
function writeHeader(header) {
  return [
    `## ${header}`,
    ''
  ].join('\n');
}


/*
  Write the table of contents.
 */
function writeTableOfContents(sections) {
  const toc = sections.map(section => `* [${section}](#${section})`).join('\n');
  return writeSection("Table of Contents", toc);
}


/*
  Write a section with a code block in it.
 */
function writeCodeSection(header, decription, command) {
  return writeSection(header, writeCodeBody(decription,command));
}


/*
  Write a code block preceeed by an informational message.
 */
function writeCodeBody(description, command) {
  return [
    description,
    '',
    '```sh',
    command,
    '```'
  ].join('\n');
}


/*
  Write the body of the "Questions" section, with contact info of the
  repo owner.
 */
function writeUserInfo(ownerName, profileUrl, avatarUrl, email) {
  const result = [
    'For questions, please contact:',
    '',
    `<img src="${avatarUrl}" alt="${ownerName}'s profile picture" height="100" width="100" />`,
    '',
    `[@${ownerName}](${profileUrl})`
  ];
  if (email) {
    result.push(`[${email}](mailtto:${email})`)
  }
  return result.join('\n');
}


/*
  Save the README file for the repo under:

    $PROJECT_ROOT/results/$REPO_NAME/README.md
 */
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


/*
  Create a folder under the project directory if it does not exist.
 */
function createFolder(directory) {
  const path = `${__dirname}/${directory}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}


module.exports = {
  write
};
