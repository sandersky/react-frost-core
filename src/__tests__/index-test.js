import {
  AjaxErrorPage as _AjaxErrorPage,
  Button as _Button,
  CodeBlock as _CodeBlock,
  Expand as _Expand,
  Icon as _Icon,
  ICON_DEFAULT_PACK as _ICON_DEFAULT_PACK,
  Link as _Link,
  Loading as _Loading,
  Password as _Password,
  PASSWORD_ALIGN_LEFT as _PASSWORD_ALIGN_LEFT,
  PASSWORD_ALIGN_RIGHT as _PASSWORD_ALIGN_RIGHT,
  Text as _Text,
  TEXT_ALIGN_LEFT as _TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT as _TEXT_ALIGN_RIGHT,
  Textarea as _Textarea,
  TEXTAREA_ALIGN_LEFT as _TEXTAREA_ALIGN_LEFT,
  TEXTAREA_ALIGN_RIGHT as _TEXTAREA_ALIGN_RIGHT,
} from '../'

import AjaxErrorPage from '../components/AjaxErrorPage'
import Button from '../components/Button'
import CodeBlock from '../components/CodeBlock'
import Expand from '../components/Expand'
import Icon, {DEFAULT_PACK as ICON_DEFAULT_PACK} from '../components/Icon'
import Link from '../components/Link'
import Loading from '../components/Loading'

import Password, {
  ALIGN_LEFT as PASSWORD_ALIGN_LEFT,
  ALIGN_RIGHT as PASSWORD_ALIGN_RIGHT,
} from '../components/Password'

import Text, {
  ALIGN_LEFT as TEXT_ALIGN_LEFT,
  ALIGN_RIGHT as TEXT_ALIGN_RIGHT,
} from '../components/Text'

import Textarea, {
  ALIGN_LEFT as TEXTAREA_ALIGN_LEFT,
  ALIGN_RIGHT as TEXTAREA_ALIGN_RIGHT,
} from '../components/Textarea'

describe('react-frost-core', () => {
  it('exports AjaxErrorPage component', () => {
    expect(_AjaxErrorPage).toBe(AjaxErrorPage)
  })

  it('exports Button component', () => {
    expect(_Button).toBe(Button)
  })

  it('exports CodeBlock component', () => {
    expect(_CodeBlock).toBe(CodeBlock)
  })

  it('exports Expand component', () => {
    expect(_Expand).toBe(Expand)
  })

  it('exports Icon constants and component', () => {
    expect(_Icon).toBe(Icon)
    expect(_ICON_DEFAULT_PACK).toBe(ICON_DEFAULT_PACK)
  })

  it('exports Link component', () => {
    expect(_Link).toBe(Link)
  })

  it('exports Loading component', () => {
    expect(_Loading).toBe(Loading)
  })

  it('exports Password constants component', () => {
    expect(_Password).toBe(Password)
    expect(_PASSWORD_ALIGN_LEFT).toBe(PASSWORD_ALIGN_LEFT)
    expect(_PASSWORD_ALIGN_RIGHT).toBe(PASSWORD_ALIGN_RIGHT)
  })

  it('exports Text constants and component', () => {
    expect(_Text).toBe(Text)
    expect(_TEXT_ALIGN_LEFT).toBe(TEXT_ALIGN_LEFT)
    expect(_TEXT_ALIGN_RIGHT).toBe(TEXT_ALIGN_RIGHT)
  })

  it('exports Textarea constants and component', () => {
    expect(_Textarea).toBe(Textarea)
    expect(_TEXTAREA_ALIGN_LEFT).toBe(TEXTAREA_ALIGN_LEFT)
    expect(_TEXTAREA_ALIGN_RIGHT).toBe(TEXTAREA_ALIGN_RIGHT)
  })
})
