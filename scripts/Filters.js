

export function FilterSearch (prop, value, arr) {
  let result = [],
      copy = [...arr]
  for (const chat of copy) {
      if (((String(chat[prop]).toLowerCase())).includes(value.toLowerCase()) === true) result.push(chat)
  }
  return (
      result
  )
}