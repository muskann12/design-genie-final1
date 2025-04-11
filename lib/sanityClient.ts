import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";



const sanityClient = createClient({
  projectId: "s6yzv893", // Replace with actual project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-12",
  token: "sk8ovAyYlwsDZUeMyrztmeuPxtjE7XXjJf3qqXHrwVGC55Gf9HuZWpukaSENWlwPUp484TgumgWs2rvt8T7m7c0AVS8aRbS5mTfRRhM7mpS5KrajNPeA5zwGl4lk3QFvfJXTGO7eJGS0FN2RLkanRo90xxFZplG1IY4siPoslXz2pDkTvHuV", // ❌ NOT SECURE (Only for testing)
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

export default sanityClient;



