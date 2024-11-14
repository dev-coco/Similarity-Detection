/**
 * @description 计算两张图像之间的相似度
 * @param {HTMLImageElement} img1 - 第一张图像
 * @param {HTMLImageElement} img2 - 第二张图像
 * @returns {string} 相似度百分比（格式化为字符串，如 "85.32"）
 */
function calculateSimilarity (img1, img2) {
  const hash1 = calculateHash(img1)
  const hash2 = calculateHash(img2)
  const similarity = calculateHashSimilarity(hash1, hash2)
  return similarity
}

/**
 * @description 计算图像的哈希值
 * @param {HTMLImageElement} img - 要计算哈希值的图像
 * @returns {string} 图像的哈希值，用二进制字符串表示
 */
function calculateHash (img) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const width = 1080
  const height = 1080
  canvas.width = width
  canvas.height = height

  ctx.drawImage(img, 0, 0, width, height)
  const imageData = ctx.getImageData(0, 0, width, height).data

  const grayscaleData = []
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i]
    const g = imageData[i + 1]
    const b = imageData[i + 2]
    const grayscale = (r + g + b) / 3
    grayscaleData.push(grayscale)
  }

  const hash = calculateDifferenceHash(grayscaleData)
  return hash
}

/**
 * @description 计算两个哈希值的相似度
 * @param {string} hash1 - 第一张图像的哈希值
 * @param {string} hash2 - 第二张图像的哈希值
 * @returns {string} 相似度百分比（格式化为字符串，如 "85.32"）
 */
function calculateHashSimilarity (hash1, hash2) {
  let equalCount = 0
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] === hash2[i]) {
      equalCount++
    }
  }
  const similarity = (equalCount / hash1.length) * 100
  return similarity.toFixed(2)
}

/**
 * @description 基于灰度值计算图像的差异哈希
 * @param {number[]} grayscaleData - 灰度值数组
 * @returns {string} 差异哈希，用二进制字符串表示
 */
function calculateDifferenceHash (grayscaleData) {
  const average = calculateAverage(grayscaleData)
  let hash = ''
  for (let i = 0; i < grayscaleData.length; i++) {
    hash += grayscaleData[i] >= average ? '1' : '0'
  }
  return hash
}

/**
 * @description 计算数组的平均值
 * @param {number[]} data - 数值数组
 * @returns {number} 数组的平均值
 */
function calculateAverage (data) {
  let sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += data[i]
  }
  return sum / data.length
}
