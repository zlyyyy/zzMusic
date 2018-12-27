import Vue from 'vue'
import { Message, Modal, Form, FormItem, Input, Dropdown, DropdownMenu, DropdownItem, Button, AutoComplete, Option, Tabs, TabPane, Table, Page, Spin, Icon, Carousel, CarouselItem } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.component('Modal', Modal)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Button', Button)
Vue.component('AutoComplete', AutoComplete)
Vue.component('Option', Option)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Spin', Spin)
Vue.component('Icon', Icon)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)

export { Vue }