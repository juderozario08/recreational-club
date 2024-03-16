<h1>This is a CPS 406 Recreational Club Membership</h1>
<h2>NOTE: Please make sure to use "git pull origin main" regularly to make sure that you are working with the latest files.</h2>

<h3>Please check the npm website by clicking the <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">here</a> to see how to install npm on windows and follow the instructions.</h3>
<p> The following information is applicable to MacOS and Linux </p>
<ul> <li>Install Homebrew from <a href="https://brew.sh/">this</a> website or copy this code</li>
  
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

<li>Install NPM(Node Package Manager) using Homebrew</li>

```sh
brew install node
```

<p>Once NPM is installed, you can copy the following command. The following command will create a directory in your $HOME directory.</p>

```sh
git clone https://github.com/juderozario08/recreational-club.git
```

<p>If you want to learn react-native with the Expo tool, please click <a href="https://reactnative.dev/docs/getting-started">here</a> to learn about react-native.
<p>Here is a quick link to the <a href="https://docs.expo.dev/">Expo documentation</a>.</p>

<h2>Once everything is setup</h2>
  <li>First install Expo on your Android or iOS devices</li>
  <li>Then cd into your project directory. Then run the following command.</li>

```sh
npm install
```

```sh
npx expo install react-native-web react-dom @expo/metro-runtime
```

```sh
npx expo start
```
  <li>Then using through the appplication or through your phones QR code scanner, scan the code and this will open this codebase on your phone.</li>
  <li>All the main code will be written in the <b>App.js</b> file. I will soon publish how the file format will go. Hoping this helps.</li>
    <h2>How to push changes</h2>
  <li>Please type the following commands first to add all the documents.</li>

  ```sh
  git add .
  ```
  ```sh
  git commit -m "Details of what was updated" 
  ```
  <li>
    Then before pushing please checkout to a new branch. A simple way to do that would be this
    <li>Instead of the "branch-name" please type what feature was potentially added</li>
  </li>
  
  ```bash
  git checkout -b branch-name
  ```
  <li>Then push into that new branch</li>

  ```bash
  git push -u origin branch-name
  ```
</ul>
