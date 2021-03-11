# stubbah

A node stub server thing.

## Usage

To start it on port 3000:

```shell
    npm install
    npm start
```

## Stupid(?) decisions

- Do I need to transpile typescript at all for the server? Can I just run it?
- Look, there's a lot of features ok.

## Planned Features (a todo list)

### Pact stubs

- Stores stubs ✅
- Matches stubs to request ✅
- UI to look at stored stubs ✅
- Add stubs by folder ✅
- API to add stubs ✅
- UI to add stubs ✅
- API to remove stubs ✅
- UI to remove stubs ✅
- API to remove provider ✅
- UI to remove provider ✅
- API to add state of provider ✅
- UI to add state of provider ✅
- API to remove state of provider ✅
- UI to remove state of provider ✅
- Counts/captures requests, and what stubs they match etc ✅
- UI to look at count/captured requests ❌
- Counter for amount of times a stub is triggered on the display pact page ✅
- Reset counter for amount of times a stub is triggered on the display pact page ❌

### Generic stubs

- Stores stubs ❌
- Matches stubs to request ❌
- Support regex route matching ❌
- Support method matching ❌
- Support body matching ❌
- UI to look at stored stubs ❌
- Add stubs by folder ❌
- API to add stubs ❌
- UI to add stubs ❌
- API to remove stubs ❌
- UI to remove stubs ❌
- API to add state of provider ❌
- UI to add state of provider ❌
- API to remove state of provider ❌
- UI to remove state of provider ❌
- Counts/captures requests, and what stubs they match etc ❌
- UI to look at count/captured requests ❌
- Counter for amount of times a stub is triggered on the display stub page ❌
- Reset counter for amount of times a stub is triggered on the display stub page ❌

### Pie in the sky ideas

- Review the https implementation, potentially merge them?
- Output useful files (what the heck is useful here)
- Act as a proxy, and record request-response
- What about... postman? And postman collections?
- Write to file? DB?
- Folder loaded as an option?
- Export just the server as something?
- Better documentation? lol pie in the sky.
- Test. hahahah. I mean I really should but also
