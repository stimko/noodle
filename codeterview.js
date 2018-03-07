//unique chars in string
var unique = "agvsdulz";

function hasAllUniqueCharsIter(str){
  var fuckyou = [], uniqueLength = str.length;
  while(uniqueLength--){
    currentChar = str[uniqueLength];
    if (!!~fuckyou.indexOf(currentChar))
      return false;
    fuckyou.push(currentChar);
  }
  return true;
}

function hasAllUniqueCharsSort(str){
  var sorted = str.split('').sort();
  var sortedLength = sorted.length-1;
  var prev = sorted[sortedLength];

  while(sortedLength--){
    if(sorted[sortedLength] === prev)
      return false;

    prev = sorted[sortedLength];
  }
  return true;
}

//reverse string
function reverseStringCryptic(str){
  for(var i = str.length, o = ''; o.length < str.length; o+=str.substr(i--, 1)){}
  return o;
}

function reverseStringElegant(str){
  return str.split('').reverse().join('');
}

//replace spaces
function replaceSpaces(str){
  return str.replace(/\s+/g, '%20');
}

//permutation
function isPermutationReverse(str1, str2){
  return str1 === reverseStringElegant(str2);
}

function isPermutation(str1, str2){
  var middleIndex = Math.floor(str1.length/2);
  var strLength = originalLength = str1.length-1;

  if (str1.length !== str2.length)
    return false;

  while(strLength--){
    if (str1.charAt(strLength) !== str2.charAt(originalLength - strLength))
      return false;
  }
  return true;
}

//compress string
function compressString(str){
  var sortedArr = str.split('').sort();
  var current = sortedArr[0];
  var count = 0;
  var compressed = '';
  sortedArr.forEach(function(i){
    if (i !== current){
      compressed += (current + count);
      count = 1;
      current = i;
    } else {
      count++;
    }
  });
  compressed += (current + count);
  return compressed;
}

//rotate matrix
var matrix = [[1, 2, 3, 4],
              [4, 5, 6, 7],
              [8, 9, 10,11],
              [12,13,14,15]];

function rotateMatrix(matrix, n){
  for(var layer = 0; layer < n/2; ++layer){
    var first = layer;
    var last = n - 1 - layer;

    for(var i = first; i < last; i++){
      var offset = i - first;
      var top = matrix[first][i];
      matrix[first][i] = matrix[last-offset][first];
      matrix[last-offset][first] = matrix[last][last-offset];
      matrix[last][last-offset] = matrix[i][last];
      matrix[i][last] = top;
    }
  }
}

rotateMatrix(matrix, 4);








