vue-component-lab
=
**Build your own vue component library.** 

Facilitates and speeds up the development of multiple vue components (best used for a set of related components). Lists all components in one place and allows tagging and searching components. Adds individual demo page for each component to test different scenarios. Uses webpack to build the library in form of a vue single page app and gulp for generating new components and demo pages. Provides bundling of developed components. 

-------

### How to use: 

#### **1. Installation**
##### **1.1 Prerequisites** 
 > - node
 > - yarn OR npm
##### **1.2 Install dependencies** 
    yarn
#### **2. Development**
##### **2.1 Run the library dev server** 
    yarn run dev
##### **2.2 Generate components** 
    yarn run generator  
You'll be asked to set the name of the component and (optionally) add some tags. Gulp tasks will generate the component, the component demo page and the required config for importing it into the library. Change the templates for demo page and component to reflect your needs.
#### **3. Deployment**
##### **3.1 Build library for static hosting** 
    yarn run build
##### **3.2 Bundle components** 
    yarn run bundle
You'll be asked to specify a name for the bundle. An equivalent bundle folder will be generated within *'/bundles'* which you can copy and insert in other projects to import your components. 

**Example:** 
Assuming you created a bundle called *"my-components"* which includes a component named *"example-component"* and the location from where you import the bundle is a folder called *"bundles"*, then import your components like this:  

  import { ExampleComponent } from 'bundles/my-components'

Adjust the import path based on where you use the import statement. 

----------

#### **Notes**
This project was created based on [vue-webpack template](https://github.com/vuejs-templates/webpack). Added [stylus](http://stylus-lang.com/) support, [lost grid system](https://github.com/peterramsing/lost) and [cssnext](http://cssnext.io/) via [postcss](http://postcss.org/), [vue-svgicon](https://github.com/MMF-FE/vue-svgicon) with [FontAwesome](http://fontawesome.io/) icons. Adjust the library build process as well as the gulp generator tasks to your needs, or add new stuff. Please create pull requests if you do so.

-------
Brought to you by http://jg7.co