export const promise = new Promise(() => {
  resolve("boop");
})
  .then((res) => {
    console.log(res);

    Promise.reject("err")
  })
  .catch(err => console.log(err))
  .finally(() => console.log("Final"));


fetch()

XMLHttpRequest

export const asycFunc = async () => {
  await fetch();
}
