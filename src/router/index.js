import Vue from 'vue'
import VueRouter from 'vue-router'
import Entrance from '@v/Entrance/Index'
import YslSubEntrance from '@v/YslSubEntrance/Index'
import ShuSubEntrance from '@v/ShuSubEntrance/Index'
import BioSubEntrance from '@v/BioSubEntrance/Index'
import GaSubEntrance from '@v/GaSubEntrance/Index'
import KlsSubEntrance from '@v/KlsSubEntrance/Index'
import ClaSubEntrance from '@v/ClaSubEntrance/Index'
import YslPdp from '@v/YslPdp/Index'
import ShuPdp from '@v/ShuPdp/Index'
import BioPdp from '@v/BioPdp/Index'
import GaPdp from '@v/GaPdp/Index'
import KlsPdp from '@v/KlsPdp/Index'
import DwLp from '@v/DwLp/Index'
import ClaEDM from '@v/ClaEDM/Index'
import GaEDM from '@v/GaEDM/Index'
import BioEDM from '@v/BioEDM/Index'
import ShuEDM from '@v/ShuEDM/Index'
import YslEDM from '@v/YslEDM/Index'
import KlsEDM from '@v/KlsEDM/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Entrance',
    component: Entrance
  },
  {
    path: '/YslSubEntrance',
    name: 'YslSubEntrance',
    component: YslSubEntrance
  },
  {
    path: '/ShuSubEntrance',
    name: 'ShuSubEntrance',
    component: ShuSubEntrance
  },
  {
    path: '/BioSubEntrance',
    name: 'BioSubEntrance',
    component: BioSubEntrance
  },
  {
    path: '/GaSubEntrance',
    name: 'GaSubEntrance',
    component: GaSubEntrance
  },
  {
    path: '/KlsSubEntrance',
    name: 'KlsSubEntrance',
    component: KlsSubEntrance
  },
  {
    path: '/ClaSubEntrance',
    name: 'ClaSubEntrance',
    component: ClaSubEntrance
  },
  {
    path: '/YslPdp',
    name: 'YslPdp',
    component: YslPdp
  },
  {
    path: '/ShuPdp',
    name: 'ShuPdp',
    component: ShuPdp
  },
  {
    path: '/BioPdp',
    name: 'BioPdp',
    component: BioPdp
  },
  {
    path: '/GaPdp',
    name: 'GaPdp',
    component: GaPdp
  },
  {
    path: '/KlsPdp',
    name: 'KlsPdp',
    component: KlsPdp
  },
  {
    path: '/DwLp',
    name: 'DwLp',
    component: DwLp
  },
  {
    path: '/ClaEDM',
    name: 'ClaEDM',
    component: ClaEDM
  },
  {
    path: '/GaEDM',
    name: 'GaEDM',
    component: GaEDM
  },
  {
    path: '/BioEDM',
    name: 'BioEDM',
    component: BioEDM
  },
  {
    path: '/ShuEDM',
    name: 'ShuEDM',
    component: ShuEDM
  },
  {
    path: '/YslEDM',
    name: 'YslEDM',
    component: YslEDM
  },
  {
    path: '/KlsEDM',
    name: 'KlsEDM',
    component: KlsEDM
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
