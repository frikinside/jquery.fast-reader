# Fast reader jQuery plugin

A simple plugin to allow fast reading text inside HTML elements showing one word at a time.

## Live Demo

<http://frikinside.github.io/jquery.fast-reader-demo/>

## Instalation

Include script after the include of jQuery library

```html
<script src="/path/to/jquery.fast-reader.min.js"></script>
```

Include the plugin css or a custom css for player styles

```html
<link href='/path/to/jquery.fast-reader.min.css' rel='stylesheet' type='text/css'>
```

### npm
You can use npm for install the plugin
```npm
npm install fast-reader
```

## Usage

```js
$("selector").fastreader();
```

### Basic Example
#### HTML
```html
<button id="start_fastreader">Start Fastreader</button>
<div id="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a efficitur est. Pellentesque et erat tempus, tristique ex at, interdum purus. Proin tempor sodales luctus. Donec interdum ullamcorper magna, ut hendrerit lorem molestie vel. Phasellus eget lectus vehicula, faucibus nulla a, rutrum quam. Nunc ut lobortis sem. Aliquam efficitur nec sapien a semper. Etiam vel mollis elit, at condimentum ante. Mauris ultricies, eros sit amet commodo ornare, ligula turpis feugiat lacus, ultrices pellentesque enim diam nec justo.</div>
```
#### JS
```js
$(document).ready(function(){
    $("#start_fastreader").click(function(){
        $("#text").fastreader();
    })
});
```

### Settings options
```js
$.fn.fastreader.defaults = {
    color: "black", // Color of the text
    useFontAwesome: false, // Use fontawesome for the controls
    autoplay: false, // Play the text when fastreader ready
    readyText: "Ready", // Text shown when the fastreader is prepared to play
    maxPivotLetterPos: 5, // Maximum position of the pivot leter (center of sight)
    wpm: 300 // Words Per Minute
};
```
#### Set settings
```js
$("#text").fastreader(
    {
        color: "blue",
        useFontAwesome: true,
        autoplay: true,
        readyText: "Let's go!",
        wpm: 100
    }
);
```

### Methods
- **pause**: Reader stops/continue showing words.
- **close**: Reader stops showing words and player close and hide. Also, reset to the start of the text.
- **destroy**: Reader stops showing words, player close, hide and then the *HTML* of the player is removed from teh * DOM* 

#### Invoke methods
```js
$("#text").fastreader("methodName"); // Generic example
$("#text").fastreader("pause"); // Player paused
$("#text").fastreader("close"); // Player closed
$("#text").fastreader("destroy"); // Player destroyed
```

## Fonts

This plugin needs a specific type of font to work properly. In order to fix the pivot leter always in the center of the sight we need a font wich every letter take the same width.
Any *monospaced* font has this property. In this case the default css is using *'Droid Sans Mono'* wich i take it from google fonts.
```html
<link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono" rel="stylesheet" type="text/css">
``` 
There are other insteresting fonts for the job, as an example, here are few of them:
- Consolas
- Menlo
- Monaco
- Lucida Console
- Liberation Mono
- DejaVu Sans Mono
- Bitstream Vera Sans Mono
- Courier New
- monospace

## TO-DO
- Set color for pivot letter in the settings (not important, you can use css for that).
- Custom template for the player.
- Countdown for the playing (instead of instant play).