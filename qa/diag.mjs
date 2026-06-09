import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage()
const errs = []
p.on('console', m => { if (m.type()==='error') errs.push('CONSOLE: '+m.text()) })
p.on('pageerror', e => errs.push('PAGEERROR: '+e.message))
await p.goto(process.env.URL||'http://localhost:5174/', {waitUntil:'networkidle'})
await p.waitForTimeout(1500)
const txt = await p.evaluate(()=>document.body.innerText.slice(0,200))
const rootHtml = await p.evaluate(()=>document.getElementById('root')?.innerHTML.length||0)
console.log('ROOT_HTML_LEN:', rootHtml)
console.log('BODY_TEXT:', JSON.stringify(txt))
console.log('ERRORS:\n'+(errs.join('\n')||'(none)'))
await b.close()
