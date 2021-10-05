import * as React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';

const movies = {
  comedia: [
    {name: 'Érase una vez en... Hollywood', img: 'https://cinenecio.com/wp-content/uploads/2020/11/poster-once-upon-a-time-in-hollywood.jpg'},
    {name: 'Juerga hasta el fin', img: 'https://cartelescine.files.wordpress.com/2013/08/juerga-hasta-el-fin.jpg?w=593'},
    {name: 'La odisea de los giles', img: 'https://lh3.googleusercontent.com/proxy/Vhm33vJGoYKoqDQC4UpHESf_M2oYt5tl2LcLgJOxewMx5fbdFIDheqywTsAsgRu7C8gsSGpeqLDNcDcZ25VycxDw0zqHh_eGJOZilP18mCONTfwdBQwALE-GTMLA3O_q73iZVQmhiNzIXwuCAL_SH9PkMZO-33ZX_JpEpu2Bn7h0MJMoxv3q-eXb'},
    {name: 'Sin rodeos', img: 'https://elpalomitron.com/wp-content/uploads/2018/02/Sin_Rodeos_Cartel_El_Palomitron.jpg'},
    {name: 'Shrek', img: 'https://clarovideocdn5.clarovideo.net/PELICULAS/SHREKDWA/EXPORTACION_WEB/SS/SHREKDWAWHORIZONTAL.jpg?size=675x380'},
    {name: 'Plan de chicas', img: 'https://i1.wp.com/noisy.es/wp-content/uploads/2017/10/girls-trip-poster.jpg?fit=660%2C330&ssl=1'}
  ],
  romance: [
    {name: 'Titanic', img: 'https://image.slidesharecdn.com/pelculatitanic-121008074947-phpapp02/95/pelcula-titanic-1-728.jpg?cb=1349683000'},
    {name: 'La gran enfermedad del amor', img: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/87fc1de7a3a93564a9a45dfae9462bb978baade3efbb7637c7bcfdaff5065a4f._UY500_UX667_RI_V_TTW_.jpg'},
    {name: 'Call Me By Your Name ', img: 'https://i.ytimg.com/vi/CDR8oapp2Wo/maxresdefault.jpg'},
    {name: 'El lado bueno de las cosas', img: 'http://2.bp.blogspot.com/-N5maU4h2fq0/VaA9PPqS_mI/AAAAAAAAAck/HzNbT8-mQ1A/s1600/el-lado-bueno-de-las-cosas-walpaper-723286.jpeg'},
    {name: 'Carol', img: 'https://i.blogs.es/988136/carol-poster/1366_2000.jpg'},
    {name: 'Crazy Rich Asians', img: 'https://wallpaperaccess.com/full/6382931.jpg'}
  ],
  accion: [
    {name: 'Creed. La leyenda de Rocky', img: 'https://claquetadebitacora.files.wordpress.com/2016/02/creedbanner4_no_date.jpg?w=967&h=390&crop=1'},
    {name: 'Al filo del mañana', img: 'https://i.blogs.es/1af78a/al-filo-del-manana-edge-of-tomorrow-tendra-secuela/1366_2000.jpg'},
    {name: 'Men in Black International', img: 'https://i.ytimg.com/vi/DG5kE8O_uP0/maxresdefault.jpg'},
    {name: 'Objetivo: La Casa Blanca', img: 'https://i.ytimg.com/vi/FRLrWEnsbGU/maxresdefault.jpg'},
    {name: 'Centinela', img: 'https://i.blogs.es/49e78a/centinela/1366_2000.jpeg'},
    {name: 'Lucy', img: 'https://www.bolsamania.com/cine/wp-content/uploads/2017/10/48-600x355.png'}
  ]
}

const series = {
  comedia: [
    {name: 'The Office', season: 9, img: 'https://cdn.forbes.com.mx/2020/05/The-Office-1.jpg'},
    {name: 'Brooklyn Nine Nine', season: 8, img: 'https://vader.news/__export/1626317624773/sites/gadgets/img/2021/07/14/brooklyn_99_serie.png_41737047.png'},
    {name: 'Modern Family', season: 11, img: 'https://www.eluniverso.com/resizer/bFUYm76_dH2bOi4tuHkSJ_9_3bM=/893x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/JFDBNBCHE5FO3FBDNXH5XTOXHI.jpg'},
    {name: 'Flight of the conchords', season: 2, img: 'https://images-na.ssl-images-amazon.com/images/I/81CHhqQTpQL._RI_.jpg'},
    {name: 'Parks and recreation', season: 7, img: 'https://beersandpolitics.com/wp-content/uploads/2016/03/parks-recreation__140511162301-1.jpg'},
    {name: 'Ted Lasso', season: 2, img: 'https://i1.wp.com/hipertextual.com/wp-content/uploads/2021/08/ted_lasso_bill_lawrence_brendan_hunt_joe_kelly_jason_sudeikis.jpg?fit=1600%2C1067&ssl=1'}
  ],
  aventura: [
    {name: 'Vikingos', season: 6, img: 'https://cloudfront-us-east-1.images.arcpublishing.com/eluniverso/IQGLPFN5WJHEBJRXFOEB4DXYZA.jpg'},
    {name: 'Sherlock', season: 3, img: 'https://3.bp.blogspot.com/-3BVDvoZw_IE/WJySZuN27NI/AAAAAAAAAT0/HqDNZgnE_bsZxi8Hm-AwfGhzPJkSIj4-ACLcB/s1600/sherlock-portada.jpg'},
    {name: 'Lost', season: 6, img: 'https://i.blogs.es/c4ae5d/lost_logo/450_1000.jpg'},
    {name: 'The 100', season: 7, img: 'data:image/jpeg;base64,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'},
    {name: 'Black Sails', season: 4, img: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d96486b6b54677e85552e5ea68b27e8f47bfd68efb118e44b1b679612cc76d3e._RI_V_TTW_.jpg'},
    {name: 'Da Vinci’s Demons', season: 3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrwssVRizlKhstyPimOaFiouFoGLqjMyZNQ&usqp=CAU '}
  ],
  fantasia: [
    {name: 'Juego de Tronos', season: 8, img: 'https://i2.wp.com/hipertextual.com/wp-content/uploads/2021/03/juego-de-tronos-ned-stark.jpg?resize=1200%2C900&ssl=1'},
    {name: 'Stranger Things', season: 4, img: 'https://as.com/meristation/imagenes/2021/08/08/noticias/1628430836_081230_1628431068_noticia_normal_recorte1.jpg'},
    {name: 'Lucifer', season: 6, img: 'https://www.show.news/__export/1599096747718/sites/debate/img/2020/09/02/lucifer-rojo_crop1599096701032.jpg_554688468.jpg'},
    {name: 'The Flash', season: 7, img: 'https://images-na.ssl-images-amazon.com/images/I/71FK-9eJS4L._RI_.jpg'},
    {name: 'The Umbrella Academy', season: 2, img: 'https://images-na.ssl-images-amazon.com/images/I/91XGV3uGpFL.jpg'},
    {name: 'The Witcher', season: 2, img: 'https://i2.wp.com/hipertextual.com/wp-content/uploads/2021/03/the-witcher-scaled.jpg?fit=1200%2C716&ssl=1'}
  ]
}

const premieres = [
  {name: 'Spider-Man: No Way Home', type: 'Película', releaseDate: '17 diciembre 2021', video: 'rt-2cxAiPJk', description: 'Por primera vez en la historia cinematográfica de Spider-Man, nuestro amigable héroe vecino está desenmascarado y ya no puede separar su vida normal de los grandes desafíos de ser un superhéroe. Cuando le pide ayuda al Doctor Strange, lo que está en juego se vuelve aún más peligroso, lo que lo obliga a descubrir lo que realmente significa ser Spider-Man.'},
  {name: 'Doctor Strange in the Multiverse of Madness', type: 'Película', releaseDate: '25 marzo 2022', video: 'IzgofMFMHH4', description: 'Después de los eventos de Endgame, Dr.Strange continúa su investigación sobre la Time Stone. Pero un viejo amigo convertido en enemigo pone fin a sus planes y hace que Strange desate una maldad indescriptible.'},
  {name: 'Eternals', type: 'Película', releaseDate: '05 noviembre 2021', video: '0WVDKZJkGlY', description: 'Los Eternos de Marvel Studios nos presenta a un nuevo y emocionante equipo de superhéroes en el Universo Cinematográfico de Marvel,antiguos alienígenas que han estado viviendo en la Tierra en secreto durante miles de años. Después de los eventos de Vengadores: Endgame, una tragedia inesperada los obliga a salir de las sombras para reunirse contra el enemigo más antiguo de la humanidad, Los Desviantes.'},
  {name: 'Mi nombre', type: 'Serie', releaseDate: '15 octubre 2021', video: '7_8eUHswhsE', description: 'Tras el asesinato de su padre, una mujer con sed de venganza decide confiar en el poderoso jefe de una red criminal... y se infiltra en la policía bajo sus órdenes.'},
  {name: 'Sé lo que hicisteis el último verano', type: 'Serie', releaseDate: '15 octubre 2021', video: 'i7MtIJwzY2I', description: 'Un año después del fatídico accidente de coche que empañó su noche de graduación, un grupo de adolescentes se ven unidos por un oscuro secreto y son acechados por un brutal asesino. Mientras intentan averiguar quién les persigue, desvelan el lado oscuro de su ciudad, aparentemente perfecta, y de ellos mismos.'},
  {name: 'The Big Leap: El gran salto', type: 'Serie', releaseDate: '18 octubre 2021', video: 'Hp7LCqGMQ54', description: 'Serie que gira en torno a un grupo de personajes diversos y sin suerte que intentan cambiar sus vidas al participar en un reality show de baile que se basa en una producción en vivo de "El lago de los cisnes". Inspirada en un formato de realidad del Reino Unido, lleva a los espectadores a un viaje de autoaceptación y empoderamiento a cualquier edad.'}
]

function Movies() {
  return (
    <View>
      <ScrollView contentContainerStyle={{display: 'flex', justifyContent: 'center'}}>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{ width: 300, height: 150, margin: 10 }} source={{uri: 'https://previews.123rf.com/images/ylivdesign/ylivdesign1703/ylivdesign170302565/73716458-rollo-de-banner-horizontal-de-cine-pel%C3%ADcula-estilo-de-dibujos-animados.jpg'}} />
        </View>
        <View style={styles.container}>
          <View style={{marginVertical: 7}}>
            <Text style={[styles.title, { marginBottom: 3 }]}>Comedia</Text>
            <ScrollView style={[styles.galeryContainer, { backgroundColor: 'black' }]} horizontal={true} >
              {
                movies.comedia.map(movie => <Image style={styles.movieImg} source={{uri: movie.img}} />)
              }
            </ScrollView>
          </View>
          <View style={{marginVertical: 7}}>
            <Text style={[styles.title, { marginBottom: 3 }]}>Romance</Text>
            <ScrollView style={[styles.galeryContainer, { backgroundColor: 'black' }]} horizontal={true} >
              {
                movies.romance.map(movie => <Image style={styles.movieImg} source={{uri: movie.img}} />)
              }
            </ScrollView>
          </View>
          <View style={{marginVertical: 7}}>
            <Text style={[styles.title, { marginBottom: 3 }]}>Acción</Text>
            <ScrollView style={[styles.galeryContainer, { backgroundColor: 'black' }]} horizontal={true} >
              {
                movies.accion.map(movie => <Image style={styles.movieImg} source={{uri: movie.img}} />)
              }
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Series() {
  return (
    <View>
      <ScrollView contentContainerStyle={{display: 'flex', justifyContent: 'center'}}>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{ width: 300, height: 150, margin: 10 }} source={{uri: 'https://www.latercera.com/resizer/gXOdyP_YUsjQ2MC6U9sUOv-gRxk=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/ONNUKFN3SNHK7F4KEH2BXHHHUA.jpg'}} />
        </View>
        <View style={styles.container}>
          <View style={{ marginVertical: 7 }}>
            <Text style={[styles.title, { marginBottom: 4 }]}>Comedia</Text>
            <Divider width={.7} color='black' />
            {
              series.comedia.map(serie =>
                <>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 2}}>
                    <Image style={styles.serieImg} source={{uri: serie.img}} />
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <Text style={[styles.subTitle, {marginVertical: 2}]}>{serie.name}</Text>
                      <Text style={{marginVertical: 2}}>{serie.season} Temporadas</Text>
                    </View>
                  </View>
                  <Divider width={.7} color='black' />
                </>
              )
            }
          </View>
          <View style={{ marginVertical: 7}}>
            <Text style={[styles.title, { marginBottom: 4 }]}>Aventura</Text>
            <Divider width={.7} color='black' />
            {
              series.aventura.map(serie =>
                <>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 2}}>
                    <Image style={styles.serieImg} source={{uri: serie.img}} />
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <Text style={[styles.subTitle, {marginVertical: 2}]}>{serie.name}</Text>
                      <Text style={{marginVertical: 2}}>{serie.season} Temporadas</Text>
                    </View>
                  </View>
                  <Divider width={.7} color='black' />
                </>
              )
            }
          </View>
          <View style={{ marginVertical: 7}}>
            <Text style={[styles.title, { marginBottom: 4 }]}>Fantasía</Text>
            <Divider width={.7} color='black' />
            {
              series.fantasia.map(serie =>
                <>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 2}}>
                    <Image style={styles.serieImg} source={{uri: serie.img}} />
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <Text style={[styles.subTitle, {marginVertical: 2}]}>{serie.name}</Text>
                      <Text style={{marginVertical: 2}}>{serie.season} Temporadas</Text>
                    </View>
                  </View>
                  <Divider width={.7} color='black' />
                </>
              )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CommingSoon() {
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  return (
    <View>
      <ScrollView contentContainerStyle={{display: 'flex', justifyContent: 'center'}}>
        {
          premieres.map(premier =>
            <>
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  webViewStyle={styles.video}
                  height={200}
                  play={false}
                  videoId={premier.video}
                />
                <View style={{display: 'flex', justifyContent: 'center'}}>
                  <Text style={[styles.subTitle, {marginVertical: 2}]}>{premier.name} ({premier.type})</Text>
                  <Text style={{marginVertical: 2, textAlign: 'justify'}}>{premier.description}</Text>
                  <Text style={{marginVertical: 2}}><B>Fecha de Estreno:</B> {premier.releaseDate}</Text>
                </View>
              </View>
              <Divider width={.7} color='black' />
            </>
          )
        }
      </ScrollView>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Movies"
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}
      >
        <Tab.Screen
          name="Películas"
          component={Movies}
          options={{
            tabBarLabel: 'Películas',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="movie" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Series"
          component={Series}
          options={{
            tabBarLabel: 'Series',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="television-guide" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Próximamente"
          component={CommingSoon}
          options={{
            tabBarLabel: 'Próximamente',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <MyTabs />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  container: {
    margin: 10
  },
  galeryContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  movieImg: {
    width: 300,
    height: 150,
    resizeMode: 'contain'
  },
  serieImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    marginVertical: 5
  },
  video: {
    width: 320,
    height: 200,
    alignSelf: 'center'
  }
})