// contains helper
Array.prototype.contains = function (element) {
   for (i in this)
       if (this[i] == element) return true;
   
   return false;
}