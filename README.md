# Class Manager

## Summary
Considering my background in K12 education, an application geared towards that niche was only a matter of time. Class Manager was heavily inspired by an established application called “Class Dojo” that I personally used as  teacher with great feedback from students, parents, and teachers. Class Manager features two different “views,” one as a teacher and another as a student. It holds a full roster of your class with randomly generated avatars representing each student. After the initial class setup, the teacher can then give and take away points from students for any number of reasons that align with the set class rules. In addition, the teacher can post stories to the Class Story page of the app, theoretically allowing the teacher to share class notes, homework, or the summary for the day. Students can then like and add comments to posts. A major difference when compared to Class Dojo is that Class Manager features a student market page, which allows students to purchase “trophies,” which allow for special perks within the classroom. With my personal experience using Class Dojo, this was a feature that I had to implement non digitally, in which I would merge the point system with a physical ticket raffle system. Here are the ways users can interact with Class Manager by their view: 

### Professor / Teacher
- give / take points away from students.
- view students’ stats.
- create class stories for the class to read and offer feedback with likes and comments.

### Students
- custom registration
- view other students’ stats.
- purchase trophies using the points that they earned.
- like and comment on posts created by the teacher/professor.
- view personal account information as well as point and trophy statistics

### What I Learned
1. Better file organization and splitting of components.
2. How to use and customize a 3rd party library (Semantic UI React).
3. How to better organize a server, it’s routes, and controllers.
4. Set up a custom database and model using MongoDB and Mongoose.
5. Error handling and form validation.
6. Using a third party for animations (Framer Motion).


### Built Using
1. MongoDB + Mongoose
2. NodeJS / Express
3. React + Redux
4. Semantic UI React
5. Framer Motion

## Design Work and Inspiration
Here is the moodboard for this app: 

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0ee2163a-d7d1-4748-86ba-e5bb73987128/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171126Z&X-Amz-Expires=86400&X-Amz-Signature=343e6a75cfddf76f734bcbb4dd1694b18cafa0d88cf7fb29c08b2397b669e260&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">

Here is a link to view the moodboard within Figma: [Class Manager Moodboard](https://www.figma.com/file/wPqCmHtYYegVXv8p4bMjnU/Class-Manager-Moodboard?node-id=0%3A1)

## Screenshots
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/56f82221-a549-46a8-9c36-71483b333af8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171329Z&X-Amz-Expires=86400&X-Amz-Signature=6364c06315210ab0e2a3d999de4991a1b2d993cd3bd698d8f4b0876850185e91&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/513c12bc-63a9-45a4-ae82-183eab68fa57/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171331Z&X-Amz-Expires=86400&X-Amz-Signature=98a3b1cf638335b40205cb872be0e264cc5eeee5e01203a627857f0e4ae27c80&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1a97652a-659b-432d-8942-93d116eb53f5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171334Z&X-Amz-Expires=86400&X-Amz-Signature=af91d8d8f54c23778d302b93906ae3f5c10db4a07eae3425edd1c923c526e660&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/83cf431a-220b-4549-95d7-2cf905809abe/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171336Z&X-Amz-Expires=86400&X-Amz-Signature=61182215c9d77ae6797be3cd1fc6698f7c2702fdad6cd748620caa3e9e504950&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1d15eb5b-bb56-4ed2-a375-c03c1468dddc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171342Z&X-Amz-Expires=86400&X-Amz-Signature=7e79a6f890f6339ee520a638c99e8e959ae391d3c53288add092feca099d4d5e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8338d80b-3d01-448b-9662-c88265ba656f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171344Z&X-Amz-Expires=86400&X-Amz-Signature=a0cb05ff1379db1c70d11bf027ff91c709f57cb0ce30451a351d639453effba3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3c771855-3278-4df7-b2b5-15e9f1ee5413/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171346Z&X-Amz-Expires=86400&X-Amz-Signature=bbe022f02ceb8c04b2ceca30fca58cc7efed38e6b321fae43691017306274306&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/db04c7a6-ea99-460f-8d99-e9f8bf1890cd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220118T171349Z&X-Amz-Expires=86400&X-Amz-Signature=5c720c2088e060f3970c0428cf87dcc323a97300c86df2beb315302319f01823&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" width="400">

  

## Contact
