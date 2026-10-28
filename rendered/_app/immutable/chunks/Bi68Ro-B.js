import{a as i,f,t as g}from"./Xzn9zRMf.js";import{R as b}from"./CmYPthY9.js";import{q as e,g as y,a1 as v}from"./BhFtvWva.js";import{l as w,s as k}from"./nP-srWEI.js";import{C as x,Q as T}from"./sTsNa_pf.js";import{D as _}from"./CuV4AsDF.js";import{C as R}from"./aAuaARWN.js";import{R as $}from"./CAogOLuT.js";const t={layout:"runbook",title:"0002 · Split #4471 and deduplicate by cause",owner:"bacvietswiss",status:"accepted",reviewed:"2026-10-28T00:00:00.000Z",signature:"bacvietswiss / Codex"},{layout:Y,title:B,owner:K,status:F,reviewed:H,signature:I}=t;var j=f(`<h2>Decision</h2> <p>Replace <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a> for new triage.
Keep that accepted record unchanged as history. Merge reports only when the evidence
supports the same cause. A matching subject is a search aid, not a cause.
If the cause is unknown, keep the report separate for investigation.</p> <h2>What #4471 contains</h2> <p>The exported incident calls this one known parser issue with one fix queued.
The table below runs the supplied classifier against the exported reports and tenant
directory. It shows two causes; fixing the parser alone leaves the form hint problem.
These are report counts, not unique customers or independent incidents.</p> <!> <h3>Parser: day and month are read in the wrong order</h3> <p>The shared parser reads dates month first for tenants whose locale writes the day first.
App and email reports, plus booking-v2 form reports for these tenants, belong here.
The original ticket belongs to this majority cause: <a href="https://github.com/bacvietswiss/mega-s01e03/issues/1" rel="nofollow">parser ticket</a>.</p> <p>Example: <code>R-41203</code> reports <strong>2 December → 12 February</strong>. The correction in <code>R-41201</code> follows <code>R-41200</code>; they remain separate report IDs, not proof of two incidents.
The fix should parse in the tenant’s intended date order and preserve the selected date
through the invite. Verify ambiguous dates and dates whose day exceeds twelve.</p> <h3>Hint: booking-v3 tells day-first tenants to type month first</h3> <p>The booking-v3 form displays <code>MM/DD/YYYY</code>, while that form reads the input in the tenant’s
day-first order. This affects form reports from <code>alder.physio</code>, <code>copper.studio</code>, and <code>pale.harbour</code>. It needs a separate ticket and a hint aligned with the form’s reader.</p> <p>Example: <code>R-41230</code>, <code>copper.studio</code>, channel <code>form</code>, reports <strong>6 January → 1 June</strong>.
Intake tagged it <code>parser</code>; the tenant’s <code>es-ES</code> locale and <code>booking-v3</code> form put it in
the hint group. Track the fix in the <a href="https://github.com/bacvietswiss/mega-s01e03/issues/2" rel="nofollow">form-hint ticket</a>.
Verify that the example, hint, accepted input, and saved date agree.</p> <!> <p>The desk’s notes name <code>R-41202</code>, <code>R-41209</code>, <code>R-41236</code>, <code>R-41344</code>, and <code>R-41620</code>.
Their bodies differ: adjacent-day shifts, a June-only pattern, an invite arriving before
booking creation, and Lisbon/Toronto displaying different days. Collect the intended
date, event timestamp, original offset, tenant and viewer time zones, form version,
and reproduction before attributing these symptoms to parsing or a time-zone defect.</p> <h2>How the counts are obtained</h2> <p><code>reports-4471.json</code> is a paginated export with overlapping rows. <code>uniqueById</code> counts each
ID once, then the page filters <code>mergedInto === 4471</code>. <code>tenantOf</code> joins the tenant directory; <code>causeOf</code> uses the tenant’s locale, form version, and report channel. <code>groupByCause</code> computes the table. Browser locale and <code>meta.intakeTag</code> are intake guesses, not the grouping key.
An unknown tenant or unsupported locale stays unplaced; do not force a match.</p> <p>Sources: <code>src/lib/data/reports-4471.json</code>, <code>src/lib/data/tenants/*.json</code>, <code>src/lib/data/desk-notes.json</code>, <code>src/lib/kb/causes.ts</code>, and <code>src/lib/kb/locales.ts</code>.
This review uses the <strong>4 October 2026 export</strong>, not a live production system.
The classifier is the desk’s model; this export does not prove historical form execution
or reproduce the underlying product defects.</p> <h2>Received is not merged</h2> <!> <p>Reports start in April; merging starts on 2 July. The large July merge bar includes an
older backlog and must not be described as a surge of new incidents. Incoming reports
continue after the ticket is marked known, through the export cutoff. “Known” does not
mean fixed, and the last reporter says they stopped reporting these failures.</p> <p>The chart uses Monday-to-Sunday weeks and the calendar date written in each timestamp.
It does not convert times into one time zone. Source receipts carry <code>+01:00</code> or <code>+02:00</code>;
merge timestamps carry <code>+02:00</code>. An offset alone does not identify an IANA time zone.</p> <h2>Triage while the desk keeps working</h2> <ol><li>Preserve the original report ID, body, receipt time, and merge history.</li> <li>Look up the tenant’s locale and booking form, then inspect the channel and symptoms.</li> <li>Route parser and hint reports to separate tickets. Keep one-day anomalies visible.</li> <li>Merge only confirmed same-cause reports. A different subject may describe the same
cause; the same subject may describe different causes. Unknowns stay separate.</li> <li>Recompute counts from unique IDs whenever the export changes, then review the page
and linked tickets together. Fixes need reproduction and verification before closure.</li></ol> <!> <h2>Consequences</h2> <p>Triage requires reading and a tenant lookup. In return, a larger ticket cannot hide a
second problem behind one queued fix. The original accepted decision remains available,
while the current triage guide and incident page point to this replacement.</p> <!>`,1);function D(d,c){const p=w(c,["children","$$slots","$$events","$$legacy"]);b(d,k(()=>p,()=>t,{children:(h,q)=>{var o=j(),r=e(y(o),8);x(r,{ticket:4471});var a=e(r,14);R(a,{kind:"warn",children:(u,A)=>{v();var m=g(`The one-day-move footnote is included in the parser total, not an extra group to add or
subtract. Those reports do not establish a third root cause. Investigate them separately
within the parser ticket rather than claiming that a date-order fix resolves them.`);i(u,m)},$$slots:{default:!0}});var s=e(a,12);T(s,{ticket:4471});var n=e(s,10);_(n,{});var l=e(n,6);$(l,{get signature(){return I}}),i(h,o)},$$slots:{default:!0}}))}const L=Object.freeze(Object.defineProperty({__proto__:null,default:D,metadata:t},Symbol.toStringTag,{value:"Module"}));export{L as _,D as a};
