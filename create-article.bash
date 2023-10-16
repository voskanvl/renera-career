echo Наименование болка: 
read a
a=$(echo $a | sed 's/[^0-9 a-z A-Z [:punct:]]//g')
/c/Program\ Files\ \(x86\)/GnuWin32/bin/tree.exe -d ./src/components

mkdir ./src/articles/$a
touch ./src/articles/$a/_$a.sass
touch ./src/articles/$a/$a.pug
echo -e ".$a\n    display: block" >> ./src/articles/$a/_$a.sass
