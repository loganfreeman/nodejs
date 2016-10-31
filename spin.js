var spin = function(message){
    var spinner = '|/-\\'.split(''), i = 0;
   return setInterval(function(){

      process.stdout.write(message + '\t\t\t\t\t\t [' + spinner[i] + '] \033[0G');

      if(i == spinner.length - 1)
         i = 0;

      i++;
   }, 50);
}
