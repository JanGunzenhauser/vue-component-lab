var gulp = require('gulp'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    prompt = require('gulp-prompt'),
    rename = require('gulp-rename');

var componentNameDefault = 'unnamed-component';
var componentImportNameDefault = 'UnnamedComponent';
var componentTagsDefault = '';
var bundleNameDefault = 'unnamed-bundle';
var componentName = componentNameDefault; 
var componentImportName = componentImportNameDefault; 
var componentTags = componentTagsDefault; 
var bundleName = bundleNameDefault; 

var config = {
  paths: {
    component: {
      template: './template/component.vue',
      destination: './src/components',
      configTemplate: './template/component-config.js',
      configDestination: './src/config'
    },
    demoPage: {
      template: './template/component-demo-page.vue',
      destination: './src/demos',
      importConfigTemplate: './template/import-config.js',
      importConfig: './src/config/index.js',
      importConfigDestination: './src/config',
    },
    bundle: {
      template: './template/bundle-index.js',
      destination: './bundles'
    }
  },
  placeholders: {
    component: {
      name: 'PLACEHOLDER:COMPONENTNAME',
      importName: '/*PLACEHOLDER:COMPONENTIMPORTNAME*/',
      tags: 'PLACEHOLDER:COMPONENTTAGS'
    },
    demoPage: {
      imports: '/*PLACEHOLDER:COMPONENTIMPORTS*/',
      importConfig: 'PLACEHOLDER:IMPORTCONFIG'
    }    
  }
};

/*********************** 
COMPONENT GENERATOR TASKS 
***********************/
gulp.task('component:set-name', function () {
  return gulp
    .src(config.paths.component.template, { read: false })
    .pipe(
      prompt.prompt([{
        type: 'input',
        name: 'title',
        message: 'Component name (like this: example-component): '
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Component tags (separated by comma, avoid spaces): '
      }], function(res){
        if (res.title !== '') {
          componentName = res.title
          componentTags = res.tags
          componentImportName = componentName
            .split('-')
            .map(function(word) {
              return word[0].toUpperCase() + word.substr(1);
            })
            .join('');
        }
      })
    )
});

gulp.task('component:generate', ['component:set-name'], function() {
    return gulp
      .src(config.paths.component.template)
      .pipe(replace(config.placeholders.component.name, componentName))
      .pipe(rename({
        basename: componentName
      }))
      .pipe(gulp.dest(config.paths.component.destination));
});

gulp.task('component:set-config', ['component:set-name'], function() {
    return gulp
      .src(config.paths.component.configTemplate)
      .pipe(replace(config.placeholders.component.name, componentName))
      .pipe(replace(config.placeholders.component.tags, function() {
        var tagList = ''
        if (componentTags !== '') {
          tagList = "'" + componentTags.split(',').join("','") + "'";
        }
        return tagList;
      }))
      .pipe(rename({
        basename: componentName
      }))
      .pipe(gulp.dest(config.paths.component.configDestination));
});

gulp.task('demo-page:generate', ['component:set-name'], function() {
    return gulp
      .src(config.paths.demoPage.template)
      .pipe(replace(config.placeholders.component.name, componentName))
      .pipe(rename({
        basename: componentName
      }))
      .pipe(gulp.dest(config.paths.demoPage.destination));
});

gulp.task('demo-page:set-import-config', ['component:set-name'], function() {
    var importConfigContent = fs.readFileSync(config.paths.demoPage.importConfig, "utf8");
    return gulp
      .src(config.paths.demoPage.importConfigTemplate)
      .pipe(replace(config.placeholders.demoPage.importConfig, function() {
        var importStatement = 'import ' + componentImportName + " from './" + componentName + "'";
        var importConfigContentPieces = importConfigContent.split(config.placeholders.demoPage.imports);
        var importConfigContentExportPieces = importConfigContentPieces[1].split(config.placeholders.component.importName);
        var newImportExportStatement = importConfigContentExportPieces[0] + '  ' + componentImportName + ',\n' + config.placeholders.component.importName + importConfigContentExportPieces[1];
        var newImportConfig = importConfigContentPieces[0] + importStatement + '\n' + config.placeholders.demoPage.imports + newImportExportStatement;
        return newImportConfig
      }))
      .pipe(rename({
        basename: 'index'
      }))
      .pipe(gulp.dest(config.paths.demoPage.importConfigDestination));
});

gulp.task('component:wrap-up', ['component:set-name', 'component:generate', 'component:set-config', 'demo-page:generate', 'demo-page:set-import-config'], function() {
  componentName = componentNameDefault; 
  componentImportName = componentImportNameDefault; 
  componentTags = componentTagsDefault; 
  return gulp
    .src(config.paths.component.template, { read: false })
});

/*********************** 
BUNDLE GENERATOR TASKS 
***********************/
gulp.task('bundle:set-name', function() {
  return gulp
    .src(config.paths.component.template, { read: false })
    .pipe(
      prompt.prompt([{
        type: 'input',
        name: 'title',
        message: 'Bundle title (example: cool-components): '
      }], function(res){
        if (res.title !== '') bundleName = res.title        
      })
    )
});

gulp.task('bundle:index', ['bundle:set-name'], function() {
  return gulp
    .src(config.paths.demoPage.importConfig)
    .pipe(replace('./', './components/'))
    .pipe(replace(config.placeholders.component.importName, ''))
    .pipe(replace(config.placeholders.demoPage.imports, ''))
    .pipe(replace('default', ''))
    .pipe(replace('[', '{'))
    .pipe(replace(']', '}'))
    .pipe(gulp.dest(config.paths.bundle.destination + '/' + bundleName))
});

gulp.task('bundle:components', ['bundle:set-name'], function() {
  return gulp
    .src(config.paths.component.destination + '/*.vue')
    .pipe(gulp.dest(config.paths.bundle.destination + '/' + bundleName + '/components'))
});

/*********************** 
*** TASK SEQUENCES
***********************/
gulp.task('bundle', ['bundle:set-name', 'bundle:index', 'bundle:components']);
gulp.task('component', ['component:set-name', 'component:generate', 'component:set-config', 'demo-page:generate', 'demo-page:set-import-config', 'component:wrap-up']);
gulp.task('default', ['component']);