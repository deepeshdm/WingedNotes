

<div align="center">  
<h1> <img src="/public/android-chrome-192x192.png" width=70/> WingedNOTES  </h1>
<p> "Keep All Notes in One Place with a Cloud-Based Notepad" </p>
</div>


<div align='center'> 
<img src="https://img.shields.io/badge/NextJS-282C34?logo=Next.Js&logoColor=ffff" alt="NextJS" title="NextJS" height="23" />  <img src="https://img.shields.io/badge/Typescript-282C34?logo=Typescript&logoColor=3178C6" alt="Typescript" title="Typescript" height="23" />  <img src="https://img.shields.io/badge/Firebase-282C34?logo=Firebase&logoColor=FFCA28" alt="Firebase" title="Firebase" height="23" />  <img src="https://img.shields.io/badge/TailwindCSS-282C34?logo=TailwindCSS&logoColor=06B6D4" alt="TailwindCSS" title="Tailwind CSS" height="23" />  <img src="https://img.shields.io/badge/JWT-282C34?logo=JsonWebTokens&logoColor=db2777" alt="JWT" title="JWT" height="23" />
</div>

<br>

<div align="center"> 
<img src="/public/example_display.gif" alt="Display Image" width="90%" /> <br><br>
</div>


## Setup Locally 👩‍🔧

1. Git clone the project repository on your local system
```javascipt
git clone https://github.com/deepeshdm/WingedNotes.git
```

2. Install dependencies in package.json
```javascipt
cd WingedNotes
npm install
```

3. Configure Firestore database on Firebase and set configs as Environment Variables in Nextjs app
```
# .env.local

# Firebase Configs
NEXT_PUBLIC_APIKEY="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_AUTHDOMAIN="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_PROJECTID="xxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_STORAGEBUCKET="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_MESSAGING_SENDERID="xxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_APPID="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# JWT Secret Key
NEXT_PUBLIC_JWT_SECRET="xxxxxxxxxxxxxxxx"
```

4. Deploy project on local server
```javascipt
npm run build 
num run start
```




